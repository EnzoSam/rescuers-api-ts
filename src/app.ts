import express from 'express';
import userRoutes from './routes/user.route';
import permissionRoutes from './routes/permision.route';
import advertisementRoutes from './routes/advertisement.route';
import animalRoutes from './routes/animal.route';
import caregiverRoutes from './routes/caregiver.route';
import postRoutes from './routes/post.route';
import atributesRoutes from './routes/atribute.route';
import zoneRoutes from './routes/zone.route';
import usefullRoutes from './routes/usefulData.route';
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/advertisement', advertisementRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/caregiver', caregiverRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/atributes', atributesRoutes);
app.use('/api/zones', zoneRoutes);
app.use('/api/usefuldata', usefullRoutes);

export {app};
