import multer from "multer";
import path from "path";
import crypto from "crypto";

// Define a pasta temporária para armazenar os arquivos antes de enviá-los ao S3
const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    // Define o destino dos arquivos temporários
    destination: tmpFolder,
    // Configura o nome do arquivo para evitar conflitos
    filename: (request, file, cb) => {
      // Gera um hash aleatório para o nome do arquivo
      const fileHash = crypto.randomBytes(10).toString("hex");
      // Combina o hash com o nome original do arquivo
      const filename = `${fileHash}-${file.originalname}`;
      // Retorna o nome do arquivo para ser usado
      return cb(null, filename);
    },
  }),
};

// Este módulo configura o multer para lidar com uploads de arquivos.
// Ele armazena os arquivos de forma temporária no servidor antes de enviá-los ao AWS S3.
// O próximo passo será configurar a integração com o S3 para mover esses arquivos temporários para o armazenamento na nuvem.
