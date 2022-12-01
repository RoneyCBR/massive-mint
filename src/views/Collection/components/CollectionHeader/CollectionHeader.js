import React, { useRef, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import ModalShare from 'components/ModalShare';
import Banner from './components/Banner';
import Information from './components/Information';
import Share from './components/Share';
import PropTypes from 'prop-types'

const CollectionHeader = ({content, address}) => {
    const [share, setShare] = useState(false)
    const {url} = useRouteMatch()
    const [backgroundImage, setBackgroundImage] = useState(content.banner_url)
    const fileRef = useRef(null);
    const handleUpload = () => {
        fileRef.current.click();
    }
    const handleChangeUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setBackgroundImage(reader.result)
        }
    }
    return (
        <React.Fragment>
            <Banner background={backgroundImage}  content={content} isVideo={content.is_video} randomThumb={content.thumb_url} >
                <Information content={content} />
            </Banner>
            <Share 
                content={content}
                func={handleUpload} 
                setState={setShare} 
                onChange={handleChangeUpload}
                fileRef={fileRef}
            />
            <ModalShare url={`https://gallery.proteinalab.com${url}?address=${address}`} open={share} setOpen={setShare} />
        </React.Fragment>
    )
}

CollectionHeader.propTypes = {
    content: PropTypes.object.isRequired,
    address: PropTypes.string.isRequired,
}

export default CollectionHeader