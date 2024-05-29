// import React from 'react';

// const Postedby = ({userId}) => {
//     return (
//         <div>
//             By {userId ? userId:"unknown user"}
//         </div>
//     );
// };

// export default Postedby;


import React from 'react';

const Postedby = ({userId, userDetails}) => {
    const author = userDetails.find(item=> item.id === userId);
    
    return (
        author ?
        <div className='name-design'> 
           <b>By {author.name}</b> 
        </div>
        :
        ""
    );
};

export default Postedby;