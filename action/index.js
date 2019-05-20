export const setHideSettings = ischecked => ({
  type: 'HIDE_SETTINGS',
  hideSettings: ischecked,
});

export const setPassword = password  =>  ({   
  type :  'SET_PASSWORD' , 
  password :  password , 
});

export const setWebsite = url  =>  ({   
  type :  'SET_WEBSITE' , 
  url :  url , 
});
