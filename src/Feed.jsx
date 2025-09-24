import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setFeed } from './store/feedSlice';
import UserCard from './components/UserCard';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from './utils/constants';

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();
    const getFeed = async () => {
        if(feed) return;
        const res = await axios.get(BASE_URL+'/feed',{withCredentials: true});
        dispatch(setFeed(res.data.data));
    }
    useEffect(() => {
        getFeed();
    }, []);
  return feed && feed.length > 0 && (
    <div className='flex flex-col items-center my-10 gap-4'>
      {feed.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  )
}

export default Feed
