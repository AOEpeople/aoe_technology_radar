import React, {ChangeEvent} from "react";
import {useConfig} from "../../context/ConfigContext/ConfigContext";
import {ConfigData} from "../../config";
import {HomepageOption} from "../../model";
import "./configEditor.css";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";


const schema = Yup.object().shape({
    size: Yup.number()
        .required("Size is required"),
    scale1: Yup.number()
        .required("Scale 1 is required"),
    scale2: Yup.number()
        .required("Scale 2 is required"),
    blipsize: Yup.number()
        .required("Blip Size is required"),
    quadKey1: Yup.string()
        .required("Quadrant 1 is required"),
    quadKey2: Yup.string()
        .required("Quadrant 2 is required"),
    quadKey3: Yup.string()
        .required("Quadrant 3 is required"),
    quadKey4: Yup.string()
        .required("Quadrant 4 is required"),
    qmap1Key3: Yup.number()
        .required("Quadrant 1 Position is required").max(4).min(1),
    qmap1Key4: Yup.string()
        .required("Quadrant 1 Description is required"),

    qmap2Key3: Yup.number()
        .required("Quadrant 2 Position is required").max(4).min(1),
    qmap2Key4: Yup.string()
        .required("Quadrant 2 Description is required"),
    qmap3Key3: Yup.number()
        .required("Quadrant 3 Position is required").max(4).min(1),
    qmap3Key4: Yup.string()
        .required("Quadrant 3 Description is required"),
    qmap4Key3: Yup.number()
        .required("Quadrant 4 Position is required").max(4).min(1),
    qmap4Key4: Yup.string()
        .required("Quadrant 4 Description is required"),
    key1: Yup.string()
        .required("Ring 1 is required"),
    key2: Yup.string()
        .required("Ring 2 is required"),
    key3: Yup.string()
        .required("Ring 3 is required"),
    key4: Yup.string()
        .required("Ring 4 is required"),

    ringKey1radius: Yup.number()
        .required("Ring 1 Radius is required"),
    ringKey1arc: Yup.number()
        .required("Ring 1 Arc Width is required"),

    ringKey2radius: Yup.number()
        .required("Ring 2 Radius is required"),
    ringKey2arc: Yup.number()
        .required("Ring 2 Arc Width is required"),

    ringKey3radius: Yup.number()
        .required("Ring 3 Radius is required"),
    ringKey3arc: Yup.number()
        .required("Ring 3 Arc Width is required"),

    ringKey4radius: Yup.number()
        .required("Ring 4 Radius is required"),
    ringKey4arc: Yup.number()
        .required("Ring 4 Arc Width is required"),

    dateFormat: Yup.string()
        .required("Date Format is required"),


    showEmptyRing: Yup.boolean(),
});


const ConfigEditor: React.FC = () => {
    const {updateConfigContext, config, resetConfigContext} = useConfig();


    const initialValues = {
        size: config?.chartConfig.size || 800,
        scale1: config?.chartConfig.scale[0] || -16,
        scale2: config?.chartConfig.scale[1] || 16,
        blipsize: config?.chartConfig.blipSize || 12,

        // Quadrants
        quadKey1: config?.quadrants["languages-and-frameworks"] || "languages-and-frameworks",
        quadKey2: config?.quadrants["methods-and-patterns"] || "methods-and-patterns",
        quadKey3: config?.quadrants["platforms-and-aoe-services"] || "platforms-and-aoe-services",
        quadKey4: config?.quadrants["tools"] || "tools",

        qmap1Key1: config?.quadrantsMap["languages-and-frameworks"].colour || "#84BFA4",
        qmap1Key2: config?.quadrantsMap["languages-and-frameworks"].txtColour || "#444444",
        qmap1Key3: config?.quadrantsMap["languages-and-frameworks"].position || 1,
        qmap1Key4: config?.quadrantsMap["languages-and-frameworks"].description || "",

        // Quadrants Map - Quadrant 2
        qmap2Key1: config?.quadrantsMap["methods-and-patterns"].colour || "#248EA6",
        qmap2Key2: config?.quadrantsMap["methods-and-patterns"].txtColour || "#FFFFFF",
        qmap2Key3: config?.quadrantsMap["methods-and-patterns"].position || 2,
        qmap2Key4: config?.quadrantsMap["methods-and-patterns"].description || "",

        // Quadrants Map - Quadrant 3
        qmap3Key1: config?.quadrantsMap["platforms-and-aoe-services"].colour || "#F25244",
        qmap3Key2: config?.quadrantsMap["platforms-and-aoe-services"].txtColour || "#444444",
        qmap3Key3: config?.quadrantsMap["platforms-and-aoe-services"].position || 3,
        qmap3Key4: config?.quadrantsMap["platforms-and-aoe-services"].description || "",

        // Quadrants Map - Quadrant 4
        qmap4Key1: config?.quadrantsMap["tools"].colour || "#F2A25C",
        qmap4Key2: config?.quadrantsMap["tools"].txtColour || "#FFFFFF",
        qmap4Key3: config?.quadrantsMap["tools"].position || 4,
        qmap4Key4: config?.quadrantsMap["tools"].description || "",

        // Rings and Attributes
        key1: config?.rings[0] || "adopt",
        key2: config?.rings[1] || "trial",
        key3: config?.rings[2] || "assess",
        key4: config?.rings[3] || "hold",
        ringKey1radius: config?.chartConfig.ringsAttributes[0]?.radius || 8,
        ringKey1arc: config?.chartConfig.ringsAttributes[0]?.arcWidth || 16,
        ringKey2radius: config?.chartConfig.ringsAttributes[1]?.radius || 11,
        ringKey2arc: config?.chartConfig.ringsAttributes[1]?.arcWidth || 4,
        ringKey3radius: config?.chartConfig.ringsAttributes[2]?.radius || 14,
        ringKey3arc: config?.chartConfig.ringsAttributes[2]?.arcWidth || 2,
        ringKey4radius: config?.chartConfig.ringsAttributes[3]?.radius || 16,
        ringKey4arc: config?.chartConfig.ringsAttributes[3]?.arcWidth || 2,

        dateFormat: config?.dateFormat || "MMMM YYYY",
        editlinkTitle: config?.editLink?.title || "",
        editlinkRadarLink: config?.editLink?.radarLink || "",
        homepageContent: config?.homepageContent || HomepageOption.both,
        showEmptyRing: !!config?.showEmptyRings || false,
    };


    interface FormValues {
        size: number;
        scale1: number;
        scale2: number;
        blipsize: number;
        ringKey1radius: number;
        ringKey1arc: number;
        ringKey2radius: number;
        ringKey2arc: number;
        ringKey3radius: number;
        ringKey3arc: number;
        ringKey4radius: number;
        ringKey4arc: number;
        dateFormat: string;
        editlinkTitle?: string;
        editlinkRadarLink: string;
        homepageContent: HomepageOption;
        quadKey1: string;
        quadKey2: string;
        quadKey3: string;
        quadKey4: string;
        qmap1Key1: string;
        qmap1Key2: string;
        qmap1Key3: number;
        qmap1Key4: string;
        qmap2Key1: string;
        qmap2Key2: string;
        qmap2Key3: number;
        qmap2Key4: string;
        qmap3Key1: string;
        qmap3Key2: string;
        qmap3Key3: number;
        qmap3Key4: string;
        qmap4Key1: string;
        qmap4Key2: string;
        qmap4Key3: number;
        qmap4Key4: string;
        key1: string;
        key2: string;
        key3: string;
        key4: string;
        showEmptyRing: boolean;
    }


    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    };


    const handleSubmit = (values: FormValues) => {
        const updatedConfig: ConfigData = {
            chartConfig: {
                size: values.size,
                scale: [values.scale1, values.scale2],
                blipSize: values.blipsize,
                ringsAttributes: [
                    {radius: values.ringKey1radius, arcWidth: values.ringKey1arc},
                    {radius: values.ringKey2radius, arcWidth: values.ringKey2arc},
                    {radius: values.ringKey3radius, arcWidth: values.ringKey3arc},
                    {radius: values.ringKey4radius, arcWidth: values.ringKey4arc},
                ],
            },
            dateFormat: values.dateFormat,
            editLink: {
                title: values.editlinkTitle,
                radarLink: values.editlinkRadarLink,
            },
            homepageContent: values.homepageContent,
            quadrants: {
                "languages-and-frameworks": values.quadKey1,
                "methods-and-patterns": values.quadKey2,
                "platforms-and-aoe-services": values.quadKey3,
                "tools": values.quadKey4,
            },
            quadrantsMap: {
                "languages-and-frameworks": {
                    colour: values.qmap1Key1,
                    txtColour: values.qmap1Key2,
                    position: values.qmap1Key3,
                    description: values.qmap1Key4,
                },
                "methods-and-patterns": {
                    colour: values.qmap2Key1,
                    txtColour: values.qmap2Key2,
                    position: values.qmap2Key3,
                    description: values.qmap2Key4,
                },
                "platforms-and-aoe-services": {
                    colour: values.qmap3Key1,
                    txtColour: values.qmap3Key2,
                    position: values.qmap3Key3,
                    description: values.qmap3Key4,
                },
                "tools": {
                    colour: values.qmap4Key1,
                    txtColour: values.qmap4Key2,
                    position: values.qmap4Key3,
                    description: values.qmap4Key4,
                },
            },
            rings: [values.key1, values.key2, values.key3, values.key4],
            showEmptyRings: values.showEmptyRing,
        };

        updateConfigContext(updatedConfig);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handleSubmit}
        >
            {({errors, touched}) => (
                <Form className="form-container">
                    <div className="section-title">
                        <h2>1 - Chart Config</h2>
                    </div>
                    <div className="form-group">
                        <label htmlFor="size">Size:</label>
                        <Field type="text" id="size" name="size"/>
                    </div>
                    <ErrorMessage name="size" component="div" className="error-message"/>
                    <div className="form-group">
                        <label htmlFor="scale">Scale:</label>
                        <div className="scale-input-group">
                            <Field type="text" id="scale1" name="scale1"/>
                            <ErrorMessage name="scale1" component="div" className="error-message"/>
                            <div style={{height: '5px'}}></div>
                            <Field type="text" id="scale2" name="scale2"/>
                            <ErrorMessage name="scale2" component="div" className="error-message"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="blipsize">Blip Size:</label>
                        <Field type="text" id="blipsize" name="blipsize"/>
                        <ErrorMessage name="blipsize" component="div" className="error-message"/>

                    </div>
                    <div className="section-title">
                        <h2>2 - Quadrants</h2>
                    </div>
                    <div className="form-group">
                        <label htmlFor="quadKey1"> Quadrant-1 Languages-and-Frameworks:</label>
                        <Field type="text" id="quadKey1" name="quadKey1"/>
                        <ErrorMessage name="quadKey1" component="div" className="error-message"/>

                    </div>
                    <div className="form-group">
                        <label htmlFor="quadKey2"> Quadrant-2 Methods-and-Patterns:</label>
                        <Field type="text" id="quadKey2" name="quadKey2"/>
                        <ErrorMessage name="quadKey2" component="div" className="error-message"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="quadKey3">Quadrant-3 Platforms-and-AOE-services:</label>
                        <Field type="text" id="quadKey3" name="quadKey3"/>
                        <ErrorMessage name="quadKey3" component="div" className="error-message"/>

                    </div>
                    <div className="form-group">
                        <label htmlFor="quadKey4">Quadrant-4 Tools:</label>
                        <Field type="text" id="quadKey4" name="quadKey4"/>
                        <ErrorMessage name="quadKey4" component="div" className="error-message"/>

                    </div>
                    <div className="section-title">
                        <h2>3 - Quadrants Map</h2>
                        <div>
                            <h3>Quadrant 1 </h3>
                            <div className="form-group">
                                <label htmlFor="qmap1Key1">Colour:</label>
                                <Field type="color" id="qmap1Key1" name="qmap1Key1"/>
                                <ErrorMessage name="qmap1Key1" component="div" className="error-message"/>

                            </div>
                            <div className="form-group">
                                <label htmlFor="qmap1Key2">Text Colour:</label>
                                <Field type="color" id="qmap1Key2"
                                       name="qmap1Key2"/>
                                <ErrorMessage name="qmap1Key2" component="div" className="error-message"/>

                            </div>
                            <div className="form-group">
                                <label htmlFor="qmap1Key3">Position:</label>
                                <Field type="text" id="qmap1Key3"
                                       name="qmap1Key3"/>
                                <ErrorMessage name="qmap1Key3" component="div" className="error-message"/>

                            </div>
                            <div className="form-group">
                                <label htmlFor="qmap1Key4">Description:</label>
                                <Field type="text" id="qmap1Key4"
                                       name="qmap1Key4"/>
                                <ErrorMessage name="qmap1Key4" component="div" className="error-message"/>

                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>Quadrant 2 </h3>
                        <div className="form-group">
                            <label htmlFor="qmap2Key1">Colour:</label>
                            <Field type="color" id="qmap2Key1" name="qmap2Key1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="qmap2Key2">Text Colour:</label>
                            <Field type="color" id="qmap2Key2" name="qmap2Key2"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="qmap2Key3">Position:</label>
                            <Field type="text" id="qmap2Key3" name="qmap2Key3"/>
                            <ErrorMessage name="qmap2Key3" component="div" className="error-message"/>

                        </div>
                        <div className="form-group">
                            <label htmlFor="qmap2Key4">Description:</label>
                            <Field type="text" id="qmap2Key4" name="qmap2Key4"/>
                            <ErrorMessage name="qmap2Key4" component="div" className="error-message"/>

                        </div>
                    </div>
                    <div>
                        <h3>Quadrant 3 </h3>
                        <div className="form-group">
                            <label htmlFor="qmap3Key1">Colour:</label>
                            <Field type="color" id="qmap3Key1" name="qmap3Key1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="qmap3Key2">Text Colour:</label>
                            <Field type="color" id="qmap3Key2"
                                   name="qmap3Key2"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="qmap3Key3">Position:</label>
                            <Field type="text" id="qmap3Key3" name="qmap3Key3"/>
                            <ErrorMessage name="qmap3Key3" component="div" className="error-message"/>

                        </div>
                        <div className="form-group">
                            <label htmlFor="qmap3Key4">Description:</label>
                            <Field type="text" id="qmap3Key4"
                                   name="qmap3Key4"/>
                            <ErrorMessage name="qmap3Key4" component="div" className="error-message"/>

                        </div>
                    </div>

                    <div>
                        <h3>Quadrant 4 </h3>
                        <div className="form-group">
                            <label htmlFor="qmap4Key1">Colour:</label>
                            <Field type="color" id="qmap4Key1" name="qmap4Key1"/>
                            <ErrorMessage name="qmap4Key1" component="div" className="error-message"/>

                        </div>
                        <div className="form-group">
                            <label htmlFor="qmap4Key2">Text Colour:</label>
                            <Field type="color" id="qmap4Key2" name="qmap4Key2"/>
                            <ErrorMessage name="qmap4Key2" component="div" className="error-message"/>

                        </div>
                        <div className="form-group">
                            <label htmlFor="qmap4Key3">Position:</label>
                            <Field type="text" id="qmap4Key3" name="qmap4Key3"/>
                            <ErrorMessage name="qmap4Key3" component="div" className="error-message"/>

                        </div>
                        <div className="form-group">
                            <label htmlFor="qmap4Key4">Description:</label>
                            <Field type="text" id="qmap4Key4" name="qmap4Key4"/>
                            <ErrorMessage name="qmap4Key4" component="div" className="error-message"/>

                        </div>
                    </div>

                    <div className="section-title">
                        <h2>4 - Rings</h2>
                    </div>
                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="key1">Key 1: ADOPT</label>
                            <Field type="text" id="key1" name="key1"/>
                            <ErrorMessage name="key1" component="div" className="error-message"/>

                        </div>
                        <div className="form-group">
                            <label htmlFor="key2">Key 2 TRIAL:</label>
                            <Field type="text" id="key2" name="key2"/>
                            <ErrorMessage name="key2" component="div" className="error-message"/>

                        </div>
                        <div className="form-group">
                            <label htmlFor="key3">Key 3: ASSESS</label>
                            <Field type="text" id="key3" name="key3"/>
                            <ErrorMessage name="key3" component="div" className="error-message"/>

                        </div>
                        <div className="form-group">
                            <label htmlFor="key4">Key 4: HOLD</label>
                            <Field type="text" id="key4" name="key4"/>
                            <ErrorMessage name="key4" component="div" className="error-message"/>

                        </div>
                    </div>
                    <div className="section-title">
                        <h2>5 - Rings Attributes / CSS </h2>
                        <div>
                            <h3>Key 1: ADOPT </h3>
                            <div className="form-group">
                                <label htmlFor="ringKey1radius">Key 1: Radius</label>
                                <Field type="text" id="ringKey1radius" name="ringKey1radius"/>
                                <ErrorMessage name="ringKey1radius" component="div" className="error-message"/>

                            </div>
                            <div className="form-group">
                                <label htmlFor="ringKey1arc">Key 1: Arc With</label>
                                <Field type="text" id="ringKey1arc" name="ringKey1arc"/>
                                <ErrorMessage name="ringKey1arc" component="div" className="error-message"/>

                            </div>
                        </div>
                        <div>
                            <h3>Key 2: TRIAL </h3>
                            <div className="form-group">
                                <label htmlFor="ringKey2radius">Key 2: Radius</label>
                                <Field type="text" id="ringKey2radius" name="ringKey2radius"/>
                                <ErrorMessage name="ringKey2radius" component="div" className="error-message"/>

                            </div>
                            <div className="form-group">
                                <label htmlFor="ringKey2arc">Key 2: Arc With</label>
                                <Field type="text" id="ringKey2arc" name="ringKey2arc"/>
                                <ErrorMessage name="ringKey2arc" component="div" className="error-message"/>

                            </div>
                        </div>
                        <div>
                            <h3>Key 3: ASSESS </h3>
                            <div className="form-group">
                                <label htmlFor="ringKey3radius">Key 3: Radius</label>
                                <Field type="text" id="ringKey3radius" name="ringKey3radius"/>
                                <ErrorMessage name="ringKey3radius" component="div" className="error-message"/>

                            </div>
                            <div className="form-group">
                                <label htmlFor="ringKey3arc">Key 3: Arc With</label>
                                <Field type="text" id="ringKey3arc" name="ringKey3arc"/>
                                <ErrorMessage name="ringKey3arc" component="div" className="error-message"/>

                            </div>
                        </div>
                        <div>
                            <h3>Key 4: HOLD </h3>
                            <div className="form-group">
                                <label htmlFor="ringKey4radius">Key 4: Radius</label>
                                <Field type="text" id="ringKey4radius" name="ringKey4radius"/>
                                <ErrorMessage name="ringKey4radius" component="div" className="error-message"/>

                            </div>
                            <div className="form-group">
                                <label htmlFor="ringKey4arc">Key 4: Arc With</label>
                                <Field type="text" id="ringKey4arc" name="ringKey4arc"/>
                                <ErrorMessage name="ringKey4arc" component="div" className="error-message"/>

                            </div>
                        </div>
                    </div>
                    <div className="section-title">
                        <h2>6 - Others</h2>
                        <div className="form-group">
                            <label htmlFor="dateFormat">Date Format:"MMMM YYYY" </label>
                            <Field type="text" id="dateFormat" name="dateFormat"/>
                            <ErrorMessage name="dateFormat" component="div" className="error-message"/>

                        </div>

                        <div>
                            <h3>Edit Link</h3>
                            <div className="form-group">
                                <label htmlFor="editlinktitle"> Edit LinkTitle</label>
                                <Field type="text" id="editlinktitle" name="editlinktitle"/>
                                <ErrorMessage name="editlinktitle" component="div" className="error-message"/>


                            </div>
                            <div className="form-group">
                                <label htmlFor="editlinkradar">Edit Link RadarLink</label>
                                <Field type="text" id="editlinkradar" name="editlinkradar"/>
                                <ErrorMessage name="editlinkradar" component="div" className="error-message"/>

                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="homepageContent">Homepage Content:</label>
                            <Field as="select" id="homepageContent" name="homepageContent">
                                <option value="chart">{HomepageOption.chart}</option>
                                <option value="columns">{HomepageOption.columns}</option>
                                <option value="both">{HomepageOption.both}</option>
                            </Field>

                        </div>

                        <div className="form-group">
                            <label htmlFor="showEmptyRing">Show Empty Ring:</label>
                            <Field type="checkbox" id="showEmptyRing" name="showEmptyRings"/>
                        </div>

                        <div className="form-group">
                            <button type="submit" className="submit-button">Submit</button>
                        </div>
                    </div>

                </Form>
            )}
        </Formik>
    );
}
export default ConfigEditor