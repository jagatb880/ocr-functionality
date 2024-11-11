// ocr.service.ts
import { Injectable } from '@angular/core';
import Tesseract from 'tesseract.js';

@Injectable({
  providedIn: 'root',
})
export class OcrService {
  constructor() {}

  recognizeText(text: string): Promise<string> {
    return new Promise((resolve, reject) => {
      Tesseract.recognize(text, 'eng', {
        logger: (m) => console.log(m), // Optional: Logs progress
      })
        .then(({ data: { text } }) => {
          resolve(text);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
