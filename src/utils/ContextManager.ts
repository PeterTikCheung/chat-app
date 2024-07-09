let sharedContext: any;

export const setSharedContext = (context: any): any => {
  sharedContext = context;
};

export const getSharedContext = (): any => sharedContext;
