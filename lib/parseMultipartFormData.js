import fs from 'fs';
import path from "path";
import {AxiosHeaders as Buffer} from "axios";

export async function parseMultipartFormData(req) {
    const buffers = [];
    for await (const chunk of req.body) {
        buffers.push(chunk);
    }
    const data = Buffer.concat(buffers);

    const boundary = req.headers.get("content-type").split("boundary=")[1];
    const parts = data.split(Buffer.from(`--${boundary}`));

    const fields = {};
    let imagePath = '';

    for (const part of parts) {
        if (part.length === 0 || part.toString() === '--') continue;

        const [header, body] = part.split(Buffer.from('\r\n\r\n'));
        const contentDisposition = header.toString().match(/Content-Disposition: form-data; name="(.+?)"(; filename="(.+?)")?/);

        if (!contentDisposition) continue;

        const name = contentDisposition[1];
        const filename = contentDisposition[3];

        if (filename) {
            const fileBuffer = body.slice(0, body.length - 2); // Remove the trailing \r\n
            const filePath = path.join(process.cwd(), `/public/uploads/${filename}`);
            fs.writeFileSync(filePath, fileBuffer);
            imagePath = filePath;
        } else {
            fields[name] = body.toString().slice(0, body.length - 2); // Remove the trailing \r\n
        }
    }

    return { fields, imagePath };
}
