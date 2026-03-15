import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { StorageService } from "../services/storage.service";
import { Router } from "@angular/router";

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const storage = inject(StorageService);
    const router = inject(Router);
    const token = storage.getToken();

    const authReq = token ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}`}
    }) : req;

    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if(error.status === 401) {
                storage.clear();
                router.navigate(['/auth/login']);
            }
            return throwError(() => error);
        })
    );
};