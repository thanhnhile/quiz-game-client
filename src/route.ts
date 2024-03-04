import GameJoin from "./pages/GameJoin";
import CreateGameSession from "./pages/CreateGameSession";
import WaitingRoom from "./pages/WaitingRoom";
import Game from "./pages/Game";
import Result from "./pages/Result";

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
  {
    path: "/game/:code/result",
    component: Result,
  },
];

export const USER_ROUTES: RouteItem[] = [
  {
    path: "/create-game",
    component: CreateGameSession,
  },
];
