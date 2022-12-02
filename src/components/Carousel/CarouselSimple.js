import React from "react";
import Carousel from "react-multi-carousel";
import PropTypes from "prop-types";
import CardAuction from "./components/CardAuction";
import CardNFT from "./components/CardNFT";
import CardProfile from "./components/CardProfile";
import CardCategories from "./components/CardCategories";
import CardCurators from "./components/CardCurators";
import CardCollection from "./components/CardCollection";
import CardDefault from "./components/CardDefault";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";

const CustomLeftArrow = ({ onClick }) => {

  return (
    <Box
      onClick={() => onClick()}
      draggable="false"
      sx={{
        position: "absolute",
        top:'0px',
        left: "0px",
        width: "30px",
        height: "100%",
        backgroundColor: "transparent",
        fontSize: "40px",
        color: "rgb(168,88,216)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: "10px 0px 0px 10px"
      }}
    >
      <Box
        sx={{
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          KhtmlUserSelect: 'none',
          msUserSelect:'none'
        }}
      >
        {"<"}
      </Box>
    </Box>
  )
};

CustomLeftArrow.propTypes = {
  onClick: PropTypes.func,
  rest: PropTypes.object
}

const CustomRightArrow = ({ onClick }) => {
  return (
    <Box
      onClick={() => onClick()}
      sx={{
        position: "absolute",
        top:'0px',
        right: "0px",
        width: "30px",
        height: "100%",
        backgroundColor: "transparent",
        fontSize: "60px",
        color: "rgb(168,88,216)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: "0px 10px 10px 0px"
      }}
    >
      <Box
        sx={{
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          KhtmlUserSelect: 'none',
          msUserSelect:'none'
        }}
      >
        {">"}
      </Box>
    </Box>
  )
};

CustomRightArrow.propTypes = {
  onClick: PropTypes.func,
  res: PropTypes.object
}


const CarouselSimple = ({ deviceType ,content,width,type,query}) => {

  const responsive = {
    big:{
      breakpoint: { max: 4000, min: 3000},
      items: 5,
      paritialVisibilityGutter: 0
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      paritialVisibilityGutter:0
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
      paritialVisibilityGutter: -2
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
      paritialVisibilityGutter: 2
    }
  };

  const [images, setImages] = React.useState([]);

  React.useEffect(async() => {
    if(deviceType=='mobile' || deviceType =='tablet'){
      if(content && content.length > 3 && type !== 'categories') {
        setImages(content.slice(0,3));
      }else{
        setImages(content);
      }
    }else{
      if(content && content.length > 7 && type !== 'categories') {
        setImages(content.slice(0,7));
      }else{
        setImages(content);
      }
    }
  },[content,deviceType]);

  
  return (
    <Grid container columns={{xs:12,sm:12,md:12,lg:12,xl:12}}
      sx={{width:'100%'}}
      component={Carousel}
      customRightArrow={<CustomRightArrow onClick={()=> this.setState({ nextSlide: 1 })}    />}
      customLeftArrow={<CustomLeftArrow onClick={()=> this.setState({ nextSlide: -1 })}    />}
      ssr={false}
      partialVisible
      deviceType={deviceType}
      responsive={responsive}
      arrows={(deviceType=='mobile' || deviceType =='tablet')?false:true}
      showDots={false}
    > 
      {
        images.slice(0,images.length).map((item,index)=>{
          return (
            <React.Fragment key={index}>
              {
                type === 'categories' ?
                <CardCategories item={item} width={width} index={index} />
                :
                <React.Fragment>
                  {
                    index < 6 ?
                    <React.Fragment>
                      {
                        type === 'auction' &&
                        <CardAuction item={item} width={width} index={index} isYour={false} />
                      }
                      {
                        type === "nft" &&
                        <CardNFT item={item} width={width} index={index} />
                      }
                      {
                        type === 'profile' &&
                        <CardProfile item={item} width={width} index={index} />
                      }
                      {
                        type === 'curators' &&
                        <CardCurators item={item} width={width} index={index} />
                      }
                      {
                        type === 'collections' &&
                        <CardCollection item={item} width={width} index={index} />
                      }
                    </React.Fragment>
                    :
                    type !== 'categories' && (deviceType!='mobile' || deviceType !='tablet') && 
                    <CardDefault images={images} width={width} type={type} query={query} />
                  }
                </React.Fragment>
              }
            </React.Fragment>
          )
        })
      }
    </Grid>
  );
};


CarouselSimple.propTypes = {
    deviceType: PropTypes.string,
    content: PropTypes.array,
    width: PropTypes.number,
    type: PropTypes.string,
    query: PropTypes.string
}

export default CarouselSimple;