import React from 'react';
import '../../styles/blogs.css';

function Blogs() {
    return ( 
        <div className='page'>
            <h1 className='page-title'>Blogs</h1>
            <p>Welcome to my blog section!</p>
            <ul>
                <li><a href="/blog1">Blog 1</a></li>
                <li><a href="/blog2">Blog 2</a></li>
                <li><a href="/blog3">Blog 3</a></li>
            </ul>
        </div>
     );
}

export default Blogs;