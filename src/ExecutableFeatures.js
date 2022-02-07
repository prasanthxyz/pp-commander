import React from 'react';

import { Button, Space } from 'antd';

const ExecutableFeature = (props) => {
    const commands = props.data.map((command, i) => (
        <Button
            onClick={() => window.featureUtils.runCommand(command.cmd)}
            key={i}>
            {command.name}
        </Button>
    ));
    return <Space size='large' wrap={true}>{commands}</Space>;
}

const ExecutableFeatures = (props) => {
    return props.data.map((feature, i) => (
        <div key={i} style={{paddingLeft: 20, paddingRight: 20}}>
            <h3>{feature.name}</h3>
            <ExecutableFeature data={feature.commands} />
            <div style={{ height: 25 }}></div>
        </div>
    ));
};

export default ExecutableFeatures;
