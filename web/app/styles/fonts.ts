// styles/fonts.js
import { Archivo, VT323, Syne } from 'next/font/google';
import localFont from 'next/font/local';


export const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

export const vt323 = VT323({
    subsets: ['latin'],
    variable: '--font-vt323',
    display: 'swap',
    weight: '400'
});

export const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

export const tacticalSans = localFont({
    src: [
        {
            path: '../../public/fonts/TacticalSans/TacticSans-Thn.woff',
            weight: '300',
            style: 'normal',
},
      {
        path: '../../public/fonts/TacticalSans/TacticSans-Reg.woff',
        weight: '400',
        style: 'normal',
      },
      {
        path: '../../public/fonts/TacticalSans/TacticSans-Bld.woff',
        weight: '500',
        style: 'normal',
      },
        {
            path: '../../public/fonts/TacticalSans/TacticSans-Blk.woff',
            weight: '600',
            style: 'normal',
        },
      // Add other font variants as needed
    ],
    variable: '--font-tactical-sans',
    display: 'swap',
  });