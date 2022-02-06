import React from 'react';

import { Button, Col, Input, Popconfirm, Row } from 'antd';

const Command = (props) => {
    return (
        <>
            <Row>
                <Col span={15}>
                    <Input
                        onChange={(e) => props.changeCommand(
                            props.featureIndex,
                            props.commandIndex,
                            { name: e.target.value, cmd: props.cmd })}
                        value={props.name} />
                </Col>
                <Col span={3}>
                    <Button
                        type='primary'
                        disabled={props.isUnmodified}
                        onClick={() => props.updateCommand(props.featureIndex, props.commandIndex)}>
                        Update
                    </Button>
                </Col>
                <Col span={3}>
                    <Popconfirm
                        title={`Delete Feature <${props.name}>. Proceed?`}
                        onConfirm={() => props.deleteCommand(props.featureIndex, props.commandIndex)}
                        okText='Yes'
                        cancelText='No'>
                        <Button type='primary' danger>Delete</Button>
                    </Popconfirm>
                </Col>
                <Col span={3}>
                    <Button type='primary' style={{ background: '#50C878' }}>Execute</Button>
                </Col>
            </Row>
            <div style={{ height: 5 }}></div>
            <Row>
                <Col span={3}>
                    <label>Command:</label>
                </Col>
                <Col span={21}>
                    <Input
                        size='small'
                        onChange={(e) => props.changeCommand(
                            props.featureIndex,
                            props.commandIndex,
                            { name: props.name, cmd: e.target.value })}
                        value={props.cmd} />
                </Col>
            </Row>
            <div style={{ height: 25 }}></div>
        </>
    );
};

export default Command;

