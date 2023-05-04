import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  declare module 'three-maze-generator' {
    export default function generateMaze(
      width: number,
      height: number,
      options?: {
        seed?: string;
        wrap?: boolean;
        entrance?: 'top' | 'bottom' | 'left' | 'right';
        exit?: 'top' | 'bottom' | 'left' | 'right';
        complexity?: number;
        density?: number;
      },
    ): {
      cells: Array<{ x: number; y: number }>;
      grid: number[][];
      width: number;
      height: number;
      entrance: { x: number; y: number };
      exit: { x: number; y: number };
    };
  }
  