import dotenv from 'dotenv';
import app from './app';

dotenv.config();

if (process.env.RENDER_EXTERNAL_URL) {
  process.env.BASE_URL = process.env.RENDER_EXTERNAL_URL;
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
