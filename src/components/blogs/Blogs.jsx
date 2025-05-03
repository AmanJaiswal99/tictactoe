import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/blogs.css';

function Blogs() {
    return ( 
        <div className='page'>
            <h1 className='page-title'>Blogs</h1>
            <p>Welcome to my blog section!</p>
            <ul>
                <li><Link to="/blog1">Blog 1</Link></li>
                <li><Link to="/blog2">Blog 2</Link></li>
                <li><Link to="/blog3">Blog 3</Link></li>
            </ul>
        </div>
     );
}

export default Blogs;