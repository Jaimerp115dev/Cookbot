import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private apiUrl = 'https://api.openai.com/v1/images/generations';

  constructor(private http: HttpClient) { }

  generateImage(prompt: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    });

    const body = {
      prompt: prompt,
      n: 1,  // Número de imágenes a generar
      size: "1920×1080"
    };

    return this.http.post(this.apiUrl, body, { headers: headers });
  }
}