import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  shareLink(email: string): void {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email.');
      return;
    }

    const appLink = 'https://your-app-link.com';
    alert(`Shared "${appLink}" with ${email}`);
  }
}
