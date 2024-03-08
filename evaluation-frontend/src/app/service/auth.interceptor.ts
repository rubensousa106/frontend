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
  //Guardar o token no local storage. Verificar se existe uma melhor prática
  let tokens = localStorage.getItem('JWT_TOKEN');
  if(!tokens){
    return null;
  }
  const token = JSON.parse(tokens).access_token;
  return token;
}
