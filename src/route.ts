import { Component } from 'react';
import GameJoin from './pages/GameJoin';
import GameStart from './pages/GameStart';

export type RouteItem = {
  path: string;
  component: any;
};

export const PUBLIC_ROUTES: RouteItem[] = [
  {
    path: '/',
    component: GameJoin,
  },
];

export const USER_ROUTES: RouteItem[] = [
  {
    path: '/start-game',
    component: GameStart,
  },
];
