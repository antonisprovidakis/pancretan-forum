import { Component } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private mdIconRegistry: MdIconRegistry, private sanitizer: DomSanitizer) {
    mdIconRegistry
      .addSvgIcon('google-plus', sanitizer.bypassSecurityTrustResourceUrl('/assets/images/social/google-plus.svg'))
      .addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('/assets/images/social/facebook.svg'))
      .addSvgIcon('twitter', sanitizer.bypassSecurityTrustResourceUrl('/assets/images/social/twitter.svg'));
    // .addSvgIcon('minotaur', sanitizer.bypassSecurityTrustResourceUrl('/assets/images/logo/minotaur.svg'));
  }
}
