import React from 'react';
import PropTypes from 'prop-types';
import { Image } from "semantic-ui-react";
import { Box,Card, CardContent,Grid} from "@mui/material";

const CardCategories =  ({item,width,index}) => {

    return (
      <Grid item  xs={12} sm={12} md={12} lg={12} xl={12}
          sx={{
              width:{xs:'calc(100% - 10px)',sm:'calc(100% - 20px)',md:'calc(100% - 40px)',lg:'calc(100% - 70px)'},
          }}
      >
        <CardContent
          sx={{
            padding:'0px 0px',
            width: "100%",
            height: "100%",
            "&:last-child":{
              padding:'5px 0px'
            }
          }}
        >
          <Card
            className={`${width}-w`}
            draggable={false}
            item={index}
            sx={{
              width: "100%",
              height: "100%",
              position:'relative'
            }}
          >
            {/* <Link
              to={`/explore?from=home&limit=6&order=created&key_name=CATEGORY&key_val=${item.category_name}`}
              style={{
                  textDecoration: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none',
                  userSelect: 'none'
              }}
            > */}
              <Box
                  sx={{
                    position:'absolute',
                    left:'0px',top:'0px',
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <Box
                        sx={{
                          width:'100%',
                          height: "100%",
                          display:'flex',
                          justifyContent:'center',
                          alignItems:'flex-end'
                        }}
                    >
                      <Box
                          sx={{
                              width:'auto',
                              boxSizing:'border-box',
                              maxWidth:'100%'
                          }}
                      >
                        <Box
                            sx={{
                                width:'100%',
                                boxSizing:'border-box',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                padding:'0.5rem',
                                borderRadius: '10px',
                                fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                fontSize:{xs:'23px',sm:'28px',md:'25px',lg:'27px',xl:'30px'},
                                fontWeight:'bold',
                                color:'#F2F2F2',
                                WebkitUserSelect: 'none',
                                MozUserSelect: 'none',
                                msUserSelect: 'none',
                                userSelect: 'none',
                                pb:'20px',
                                textAlign:'center'
                            }}
                        >
                          {item && item.category_name} 
                        </Box>
                      </Box>
                  </Box> 
              </Box>
            
              <Box
                sx={{
                    width: "100%",
                    height:{xs:'300px',sm:'340px',md:'250px',lg:'310px',xl:'480px'},
                }}
              >
                <Image
                    draggable={false}
                    style={{ width: "100%", height: "100%" }}
                    src={item.thumb_url_large}
                />
              </Box>
            {/* </Link> */}
          </Card>
        </CardContent>
      </Grid>
    );
};

CardCategories.propTypes = {
    item: PropTypes.object,
    width: PropTypes.number,
    index: PropTypes.number
};

export default CardCategories;