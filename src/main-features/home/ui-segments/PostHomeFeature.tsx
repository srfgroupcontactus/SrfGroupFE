import React, { FunctionComponent } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { AllAppConfig } from "../../../core/config/all-config";
import { StorageService } from "../../../shared/services/storage.service";
import { connect, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { IPostHomeFeature } from "../../../shared/model/post-home-feature.model";
import i18n from "i18next";
import { entityHomeFeatures } from "../store/slice";
import { getBaseImageUrl } from "../../../shared/utils/utils-functions";

const PostHomeFeature: FunctionComponent = () => {
  const [entityPostHomeFeature, setEntityPostHomeFeature] =
    React.useState<IPostHomeFeature>(
      StorageService.local.get(AllAppConfig.POST_HOME_FEATURE)
    );
  const [defaultLanguage, setDefaultLanguage] = React.useState("fr");

  const entityHomeFeaturesSelector = useSelector(entityHomeFeatures) ?? {};

  React.useEffect(() => {
    i18n.on("languageChanged", (lang: any) => {
      setDefaultLanguage(lang);
    });
  }, []);

  React.useEffect(() => {
    if (!isEmpty(entityHomeFeaturesSelector)) {
      StorageService.local.set(
        AllAppConfig.POST_HOME_FEATURE,
        entityHomeFeaturesSelector
      );
    }
  }, [entityHomeFeaturesSelector]);

  const getDescription = (): string => {
    if (defaultLanguage === "en") {
      return entityPostHomeFeature.descriptionEn || "";
    } else if (defaultLanguage === "fr") {
      return entityPostHomeFeature.descriptionFr || "";
    }
    return entityPostHomeFeature.descriptionAr || "";
  };

  return (
    <Container maxWidth="xl" sx={{ my: 10 }}>
      {!isEmpty(entityPostHomeFeature) ? (
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <img
              className="full-img-responsive"
              src={entityPostHomeFeature.image}
              alt="bg"
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = getBaseImageUrl(AllAppConfig.DEFAULT_LAZY_IMAGE);
              }}
              width="1000"
              height="500"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <div dangerouslySetInnerHTML={{ __html: getDescription() }}></div>
          </Grid>
        </Grid>
      ) : null}
    </Container>
  );
};
export default React.memo(PostHomeFeature);
