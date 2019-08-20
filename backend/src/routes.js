import { Router } from 'express';
import multer from 'multer';

import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);
// --- Rotas sem o middleware de autorização ---
// Rota de registro de usuários
routes.post('/users', UserController.store);
// Rota de login
routes.post('/sessions', SessionController.store);

// --- Middleware global de autenticação ---
routes.use(authMiddleware);
// Rota de Edição de usuário
routes.put('/users', UserController.update);
// Rota de Upload de arquivos
routes.post('/files', upload.single('file'), FileController.store);
// Rota de Providers
routes.get('/providers', ProviderController.index);

export default routes;
