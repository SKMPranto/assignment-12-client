import React, { useEffect } from 'react';

const Title = (title) => {
    return useEffect(()=>{
        document.title=`Tap&Earn | ${title}`
    },[title])
};

export default Title;