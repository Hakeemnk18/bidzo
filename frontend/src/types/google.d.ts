export {};

declare global {
  namespace google {
    namespace accounts {
      namespace oauth2 {
        function initTokenClient(config: {
          client_id: string;
          scope: string;
          callback: (response: { access_token: string }) => void;
        }): {
          requestAccessToken: () => void;
        };
      }
    }
  }
}