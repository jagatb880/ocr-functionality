import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OcrService } from './ocr.service';
import { NgIf } from '@angular/common';
import * as mammoth from 'mammoth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  docxContent: string = '';
  selectedText: string = '';

  constructor(private ocrService: OcrService) {}

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const docxFile = fileInput.files[0];

      this.convertDocxToHtml(docxFile);
    }
  }

  async convertDocxToHtml(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    mammoth
      .convertToHtml({ arrayBuffer })
      .then((result) => {
        this.docxContent = result.value;
      })
      .catch((error) => {
        console.error('Error reading DOCX file:', error);
      });
  }

  onTextSelect(event: MouseEvent) {
    const selection = window.getSelection();
    if (selection) {
      this.selectedText = selection.toString().trim();
      if (this.selectedText) {
        // Send the selected text for OCR processing
        this.processSelectedText(this.selectedText);
      }
    }
  }

  processSelectedText(text: string) {
    this.ocrService
      .recognizeText(text)
      .then((extractedText) => {
        console.log('Extracted Text:', extractedText);
      })
      .catch((error) => {
        console.error('Error recognizing text:', error);
      });
  }
}
