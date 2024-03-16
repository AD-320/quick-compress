import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs'; 
import { fileTypeFromBuffer } from 'file-type';
import fetch from 'node-fetch';
import FormData from 'form-data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Supported file extensions
const supportedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'];

const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    if (supportedExtensions.includes(extension)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file extension.'), false);
    }
};

// Configure Multer with file filtering
const upload = multer({ dest: 'uploads/', fileFilter });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/compress', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image uploaded.');
  }

  // Extracting the quality setting from the form input
  const qualityLevel = req.body.quality || '92';

  // Read the file into a buffer for file type checking
  const buffer = await fs.readFile(req.file.path);
  const type = await fileTypeFromBuffer(buffer);

  if (!type || !supportedExtensions.includes(`.${type.ext}`)) {
    return res.status(400).send('Unsupported file format.');
  }

  const formData = new FormData();
  formData.append('files', buffer, req.file.originalname);

  try {
    const response = await fetch(`http://api.resmush.it/?qlty=${qualityLevel}`, {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.dest) {
      res.render('result', { imageUrl: result.dest });
    } else {
      throw new Error('No destination URL in response');
    }
  } catch (error) {
    console.error('Compression error:', error);
    res.status(500).send('Failed to compress the image. ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
