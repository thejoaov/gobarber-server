import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// --- Rotas sem o middleware de autorização ---
// Rota de registro de usuários
routes.post('/users', UserController.store);
// Rota de login
routes.post('/sessions', SessionController.store);

// --- Middleware global de autenticação ---
routes.use(authMiddleware);
// Rota de Edição de usuário
routes.put('/users', UserController.update);

export default routes;
