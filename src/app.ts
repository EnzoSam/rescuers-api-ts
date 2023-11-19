import express from 'express';
import userRoutes from './routes/user.route';
import permissionRoutes from './routes/permision.route';
import advertisementRoutes from './routes/advertisement.route';
import animalRoutes from './routes/animal.route';
import caregiverRoutes from './routes/caregiver.route';
import postRoutes from './routes/post.route';

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/permissions', permissionRoutes);
app.use('/advertisement', advertisementRoutes);
app.use('/animal', animalRoutes);
app.use('/caregiver', caregiverRoutes);
app.use('/post', postRoutes);


export default app;
