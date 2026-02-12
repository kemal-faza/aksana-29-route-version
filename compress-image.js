import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';

// --- KONFIGURASI ---
const TARGET_DIR = './public';
const QUALITY = 75;
const FORCE_UPDATE = true; // <--- UBAH JADI TRUE (Agar file lama ditimpa)
const RESPONSIVE_WIDTHS = [320, 640, 960, 1080];
// -------------------

async function processImages(directory) {
	try {
		const files = await fs.readdir(directory);

		for (const file of files) {
			const filePath = path.join(directory, file);
			const stat = await fs.stat(filePath);

			if (stat.isDirectory()) {
				await processImages(filePath);
			} else {
				const ext = path.extname(file).toLowerCase();

				// Target JPG, PNG, dan WebP (untuk bikin ukuran responsif)
				if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
					const nameWithoutExt = path.parse(file).name;
					const isVariant = /-\d+$/.test(nameWithoutExt);

					if (isVariant) {
						continue;
					}

					for (const width of RESPONSIVE_WIDTHS) {
						const newFileName = `${nameWithoutExt}-${width}.webp`;
						const newFilePath = path.join(directory, newFileName);
						const exists = await fs.pathExists(newFilePath);

						if (exists && !FORCE_UPDATE) {
							continue;
						}

						console.log(`Processing: ${file} -> ${newFileName}...`);

						try {
							await sharp(filePath)
								.resize({
									width,
									withoutEnlargement: true,
								})
								.webp({ quality: QUALITY })
								.toFile(newFilePath);

							console.log(`✅ Converted: ${newFileName}`);
						} catch (sharpError) {
							console.error(
								`❌ Gagal memproses ${file}:`,
								sharpError.message,
							);
						}
					}
				}
			}
		}
	} catch (err) {
		console.error('Error:', err);
	}
}

console.log('🚀 Memulai optimasi gambar massal (Force Mode)...');
processImages(TARGET_DIR);
