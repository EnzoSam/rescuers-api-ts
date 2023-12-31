import express from 'express';
import userRoutes from './routes/user.route';
import permissionRoutes from './routes/permision.route';
import advertisementRoutes from './routes/advertisement.route';
import animalRoutes from './routes/animal.route';
import caregiverRoutes from './routes/caregiver.route';
import postRoutes from './routes/post.route';
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/advertisement', advertisementRoutes);
app.use('/api/animal', animalRoutes);
app.use('/api/caregiver', caregiverRoutes);
app.use('/api/post', postRoutes);


export {app};
