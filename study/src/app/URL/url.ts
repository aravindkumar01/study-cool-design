import decode from 'jwt-decode';
export class Url {

    public static get username():string{
        const token = localStorage.getItem('token');
        // decode the token to get its payload
        const tokenPayload = decode(token);
        
        return tokenPayload.sub;
    }
    public static get userRole():string{
        const token = localStorage.getItem('token');
        // decode the token to get its payload
        const tokenPayload = decode(token);        
        return tokenPayload.scopes;
    }

    public static get baseURL(): string {
         return "http://localhost:8091";
    }

    public static get loginURL(): string {
        return "/token/generate-token";
   }

   public static get registerURL(): string {
    return "/signup";
    }
    public static get restUrl(): string {
        return "/api";
   }
    public static get userUrl(): string {
        return "/user";
   }
   public static get univercityUrl(): string {
    return "/univercity";
    }
    public static get courseUrl(): string {
        return "/course";
    }

    public static get subjectUrl(): string {
         return "/subject";
      }
      public static get sylabusUrl(): string {
            return "/sylabus";
      }
      public static get contentUrl(): string {
            return "/content";
       }

       public static get blogsUrl(): string {
        return "/blogs";
   }
    public static get roleUrl(): string {
    return "/role";
    }

    public static get fileUrl(): string {
        return "/file";
        }
       
}
