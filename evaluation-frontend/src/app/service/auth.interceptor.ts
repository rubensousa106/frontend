import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtToken = getJwtToken();
  if(jwtToken){
    var cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return next(cloned);
  }
  return next(req);
};

function getJwtToken(): string |null{
  //save token in local storage
  let tokens = localStorage.getItem('JWT_TOKEN');
  if(!tokens){
    return null;
  }
  const token = JSON.parse(tokens).access_token;
  return token;
}
