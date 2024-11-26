import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

    @Output() SendLogInStatusEvent = new EventEmitter<boolean>();

    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    public isLoggedIn = this.isLoggedInSubject.asObservable();
    public dataStream: Observable<number>;
    public isUserLoged: Observable<boolean>;

    private userSubject = new BehaviorSubject<any>(null);
    public user = this.userSubject.asObservable();

    constructor(private accountService: AccountService) {
        
        const token = this.accountService.localStorage.getUserToken();
        const user = this.accountService.localStorage.getUser();
      
        if (token && user) {
          this.isLoggedInSubject.next(true);
          this.userSubject.next(user);
        } else {
          this.isLoggedInSubject.next(false);
          this.userSubject.next(null);
        }

        this.dataStream = interval(1000); // Emits a value every second
    }


    login(response: any) {

        this.accountService.localStorage.saveLocalUserData(response);
        this.isLoggedInSubject.next(true);
        this.SendLogInStatusEvent.emit(true);
    }

    logout() {
        this.accountService.localStorage.clearLocaluserData();
        this.isLoggedInSubject.next(false); // Atualiza o estado de logout
    }

    checkLoginStatus(): boolean
     {
        const token = this.accountService.localStorage.getUserToken();
        const user = this.accountService.localStorage.getUser();
        const isLoggedIn = !!user;
        this.isLoggedInSubject.next(isLoggedIn);
        if (user) {
          return isLoggedIn;
        }
        return isLoggedIn;
    }

  
    getRealTimeData(): Observable<number> {
      return this.dataStream;
    }
}
