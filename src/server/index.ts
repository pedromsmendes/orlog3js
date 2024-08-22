import fs from 'node:fs';
import path from 'node:path';

import sirv from 'sirv';
import chalk from 'chalk';
import express from 'express';
import compression from 'compression';
import packageJson from 'package.json';
import { createServer as createViteServer, ViteDevServer } from 'vite';

import { IN_PROD, PORT } from '@/globals';
import { validateEnvVariables } from '@/tools/envValidation';

validateEnvVariables([
  'NODE_ENV',
  'PORT',
]);

const BASE = '/';

const createServer = async () => {
  const app = express();

  let vite: ViteDevServer | null = null;

  if (!IN_PROD) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base: BASE,
    });

    app.use(vite.middlewares);
  } else {
    app.use(compression());
    app.use(BASE, sirv('/dist/client', { extensions: [] }));
  }

  app.use('*', async (req, res) => {
    const url = req.originalUrl;

    try {
      let template;
      let render;

      if (!IN_PROD) {
        template = await vite?.transformIndexHtml(
          url,
          fs.readFileSync(path.resolve('./index.html'), 'utf-8'),
        );

        render = (await vite?.ssrLoadModule('/src/client/index.ssr.tsx'))?.render;
      } else {
        template = fs.readFileSync('/dist/client/index.html', 'utf-8');
        // @ts-expect-error Path should exist when the project builds
        render = (await import('/dist/ssr/index.ssr.js')).render;
      }

      const rendered = await render(url);

      const html = template
        ?.replace(`<!--app-head-->`, rendered.head ?? '')
        ?.replace(`<!--app-html-->`, rendered.html ?? '');

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (e: any) {
      // If an error is caught, let Vite fix the stack trace so it maps back
      // to your actual source code.
      vite?.ssrFixStacktrace(e);
      console.error(e.stack);
      res.status(500).end(e.stack);
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.info();
    console.info(chalk.cyan(`'${packageJson.name}' listening on port ${chalk.bold(PORT)}`));
    console.info();
    console.info(`  -> ${chalk.bold.underline(`http://localhost:${PORT}`)}`);
  });
};

createServer()
  .catch((e) => {
    console.error('Fatal error occurred starting server!');
    console.error(e);
    process.exit(101);
  });