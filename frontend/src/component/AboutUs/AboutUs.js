import React, {Component} from 'react';
import Content from "../../Dashboard/Content";
import {Typography} from "@material-ui/core";
import {withTranslation} from "react-i18next";

class AboutUs extends Component {

    render() {
         const { t } = this.props;
        return (
            <Content>
                <div
                    style={{
                      width: "100%",
                      height: "430px",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      filter: "contrast(75%)",
                      backgroundImage: "url(/img/logo/afr1.png)",
                    }}
                  />

                <br/> <br/><br/>
                <Typography variant="h4" component="h4">{t("about.us.title")}</Typography>
                <br/><br/>
                <Typography>

                    {t("about.afropa")}

                </Typography>

            </Content>
        );
    }
}

export default (withTranslation() (AboutUs));