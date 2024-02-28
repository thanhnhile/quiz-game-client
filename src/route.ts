import GameJoin from "./pages/GameJoin";
import CreateGameSession from "./pages/CreateGameSession";
import WaitingRoom from "./pages/WaitingRoom";
import Game from "./pages/Game";

export type RouteItem = {
  path: string;
  component: any;
};

export const PUBLIC_ROUTES: RouteItem[] = [
  {
    path: "/",
    component: GameJoin,
  },
  {
    path: "/game-waiting/:code",
    component: WaitingRoom,
  },
  {
    path: "/game/:code",
    component: Game,
  },
];

export const USER_ROUTES: RouteItem[] = [
  {
    path: "/create-game",
    component: CreateGameSession,
  },
];
