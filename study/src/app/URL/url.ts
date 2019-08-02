export class Url {

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
       
}
