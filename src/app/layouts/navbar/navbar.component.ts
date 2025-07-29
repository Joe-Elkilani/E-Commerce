import { loggedGuard } from './../../core/guards/logged/logged.guard';
import { Component, OnInit, signal } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  constructor(private flowbiteService: FlowbiteService, private router: Router,private userService:UserService) {}
  loggedIn = signal(false);
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.flowbiteService.loadFlowbite(() => initFlowbite());
    this.userService.isLoggedIn$.subscribe((status) => this.loggedIn.set(status));
  }
  signOut(): void {
    this.userService.signOut();
  }
}
