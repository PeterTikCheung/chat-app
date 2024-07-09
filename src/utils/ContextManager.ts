let sharedContext: any;

export const setSharedContext = (context: any) => {
  sharedContext = context;
};

export const getSharedContext = () => sharedContext;
