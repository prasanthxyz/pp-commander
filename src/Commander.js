import './Commander.css';

import React from 'react';
import Command from './Command';
import ExecutableFeatures from './ExecutableFeatures';

import { Alert, Button, Col, Collapse, Input, PageHeader, Popconfirm, Row, Space, Switch } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import _ from 'lodash';
const { Panel } = Collapse;

const EDITOR = 'EDITOR';
const VIEWER = 'VIEWER';

class Commander extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalFeatures: [],
            features: [],
            isUnmodified: [],
            isFeatureNameUnmodified: [],
            activeKey: -1,
            errorText: '',
            visibleComponent: VIEWER,
        };
        this.addCommand = this.addCommand.bind(this);
        this.changeFeatureName = this.changeFeatureName.bind(this);
        this.updateFeatureName = this.updateFeatureName.bind(this);
        this.changeCommand = this.changeCommand.bind(this);
        this.updateCommand = this.updateCommand.bind(this);
        this.deleteCommand = this.deleteCommand.bind(this);
        this.addFeature = this.addFeature.bind(this);
        this.deleteFeature = this.deleteFeature.bind(this);
        this.handleCollapseClick = this.handleCollapseClick.bind(this);
        this.toggleVisibleComponent = this.toggleVisibleComponent.bind(this);
    }

    componentDidMount() {
        const features = window.featureUtils.getFeatures();
        const isUnmodified = [];
        for (const feature of features) {
            isUnmodified.push(Array(feature.commands.length).fill(true));
        }

        this.setState({
            originalFeatures: _.cloneDeep(features),
            features: _.cloneDeep(features),
            isUnmodified: isUnmodified,
            isFeatureNameUnmodified: Array(features.length).fill(true)
        })
    }

    render() {
        const features = this.state.features.map((feature, i) => {
            const commands = feature.commands.map((command, j) => (
                <Command
                    key={j}
                    featureIndex={i}
                    commandIndex={j}
                    isUnmodified={this.state.isUnmodified[i][j]}
                    isErrorDisplayed={this.state.errorText !== ''}
                    changeCommand={this.changeCommand}
                    updateCommand={this.updateCommand}
                    deleteCommand={this.deleteCommand}
                    {...command} />));
            const featureHeader = (
                <>
                    <div
                        style={{width: 40, padding:5}}
                        onClick={() => this.handleCollapseClick(i)}>
                        <CaretRightOutlined/>
                    </div>
                    <Input
                        value={feature.name}
                        onChange={(e) => this.changeFeatureName(i, e.target.value)} />
                    <div style={{width: 20}}></div>
                    <Button
                        disabled={
                            this.state.isFeatureNameUnmodified[i]
                            || this.state.originalFeatures.map(f => f.name).includes(this.state.features[i].name)
                            || this.state.features[i].name === ''}
                        onClick={() => this.updateFeatureName(i)}>
                        Save
                    </Button>
                </>
            );
            return (
                <Panel key={i} header={featureHeader} showArrow={false}>
                    {commands}
                    <Row>
                        <Col span={12}>
                            <Button
                                type='primary'
                                disabled={this.state.originalFeatures[i].name === ''}
                                onClick={() => this.addCommand(i)}>
                                Add new Command
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Popconfirm
                                title={`Delete Feature <${feature.name}>. Proceed?`}
                                onConfirm={() => this.deleteFeature(i)}
                                okText='Yes'
                                cancelText='No'>
                                <Button type='primary' danger>Delete Feature</Button>
                            </Popconfirm>
                        </Col>
                    </Row>
                </Panel>
            );
        });
        const errorAlert = (this.state.errorText === '')
            ? <></>
            : <Alert type='error' message={this.state.errorText} banner />

        const viewerComponents = (
            <>
                <h1>Available Features</h1>
                <ExecutableFeatures data={this.state.originalFeatures} />
            </>
        );

        const editorComponents = (
            <>
                <h1>Editor</h1>
                {errorAlert}
                <Collapse accordion activeKey={this.state.activeKey}>
                    {features}
                </Collapse>
                <div style={{ height: 25 }}></div>
                <Button type='primary' onClick={this.addFeature}>Create new Feature</Button>
            </>
        );

        const displayComponent = (this.state.visibleComponent === EDITOR) ? editorComponents : viewerComponents;

        return (
            <div className='Commander'>
                <Space>
                    <PageHeader title='Commander' />
                    <div style={{float: 'right'}}>
                        <div>View EDITOR: </div>
                        <Switch onChange={this.toggleVisibleComponent} />
                    </div>
                </Space>
                <div style={{ height: 25 }}></div>
                {displayComponent}
                <div style={{ height: 25 }}></div>
            </div>
        );
    }

    changeFeatureName(featureIndex, newFeatureName) {
        const errorText = (
            this.state.originalFeatures[featureIndex].name !== newFeatureName
            && this.state.originalFeatures.map(f => f.name).includes(newFeatureName)
        )
            ? 'Feature name already exists'
            : (newFeatureName === '')
                ? 'Please enter a feature name'
                : '';
        const newState = _.cloneDeep(this.state);
        newState.features[featureIndex].name = newFeatureName;
        const originalFeatureName = newState.originalFeatures[featureIndex].name;
        newState.isFeatureNameUnmodified[featureIndex] = (originalFeatureName === newFeatureName);
        newState.errorText = errorText;
        this.setState(newState);
    }

    updateFeatureName(featureIndex) {
        const oldName = this.state.originalFeatures[featureIndex].name;
        const newName = this.state.features[featureIndex].name;
        if(
            (this.state.originalFeatures[featureIndex].name !== newName
            && this.state.originalFeatures.map(f => f.name).includes(newName)) || newName === ''
        ) {
            return;
        }

        const newState = _.cloneDeep(this.state);
        const data = newState.features[featureIndex];
        window.featureUtils.renameFeature(oldName, newName, data.commands);
        newState.originalFeatures[featureIndex] = _.cloneDeep(data);
        newState.isFeatureNameUnmodified[featureIndex] = true;
        newState.isUnmodified[featureIndex].fill(true);
        this.setState(newState);
    }

    addFeature() {
        const newState = _.cloneDeep(this.state);
        const newFeature = { name: "", commands: [] };
        newState.features.push(_.cloneDeep(newFeature));
        newState.originalFeatures.push(_.cloneDeep(newFeature));
        newState.isUnmodified.push([]);
        newState.isFeatureNameUnmodified.push(true);
        this.setState(newState);
    }

    deleteFeature(featureIndex) {
        window.featureUtils.deleteFeature(this.state.features[featureIndex].name);
        const newState = _.cloneDeep(this.state);
        newState.features.splice(featureIndex, 1);
        newState.originalFeatures.splice(featureIndex, 1);
        newState.isFeatureNameUnmodified.splice(featureIndex, 1);
        newState.activeKey = -1;
        this.setState(newState);
    }

    addCommand(featureIndex) {
        const newState = _.cloneDeep(this.state);
        const newData = { name: '', cmd: '' };
        newState.features[featureIndex].commands.push({ ...newData });
        newState.originalFeatures[featureIndex].commands.push({ ...newData });
        newState.isUnmodified[featureIndex].push(true);
        this.setState(newState);
    }

    changeCommand(featureIndex, commandIndex, data) {
        const newState = _.cloneDeep(this.state);
        newState.features[featureIndex].commands[commandIndex] = data;
        const originalData = newState.originalFeatures[featureIndex].commands[commandIndex];
        newState.isUnmodified[featureIndex][commandIndex] = _.isEqual(originalData, data);
        this.setState(newState);
    }

    updateCommand(featureIndex, commandIndex) {
        const newState = _.cloneDeep(this.state);
        const data = newState.features[featureIndex];
        window.featureUtils.writeFeature(data.name, data.commands);
        newState.originalFeatures[featureIndex] = _.cloneDeep(data);
        newState.isUnmodified[featureIndex][commandIndex] = true;
        this.setState(newState);
    }

    deleteCommand(featureIndex, commandIndex) {
        const newState = _.cloneDeep(this.state);
        newState.features[featureIndex].commands.splice(commandIndex, 1);
        newState.originalFeatures[featureIndex].commands.splice(commandIndex, 1);
        newState.isUnmodified[featureIndex].splice(commandIndex, 1);
        const featureData = newState.features[featureIndex];
        window.featureUtils.writeFeature(featureData.name, featureData.commands);
        this.setState(newState);
    }

    handleCollapseClick(clickedKey) {
        if (this.state.activeKey === clickedKey) {
            clickedKey = -1;
        }
        this.setState({
            activeKey: clickedKey
        });
    }

    toggleVisibleComponent() {
        this.setState({
            visibleComponent: (this.state.visibleComponent === EDITOR) ? VIEWER : EDITOR
        });
    }
}

export default Commander;