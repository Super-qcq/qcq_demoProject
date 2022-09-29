</Form.Item >

{
    this.otherIleVersionLable && this.otherIleVersionLable.map(otherIleVersionEle => {
        return (<Form.Item label={
            < span >
                <Icon type="question-circle" style={{ color: '#1890ff' }
                }
                    onClick={e => { window.open(`https://docsite.novelbrain.com/doc/001_%E5%B8%AE%E5%8A%A9%E6%96%87%E6%A1%A3/05_%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7/02.4_%E7%89%A9%E7%A7%8D%E7%AE%A1%E7%90%86--%E5%BB%BA%E7%B4%A2%E5%BC%95.md`) }}
                />
                & nbsp; {otherIleVersionEle}
            </span>
        }>
            {getFieldDecorator('otherFileVersion', {})(
                <Select onSelect={null} onFocus={() => this.props.setCurrentStep(0)} onPopupScroll={(event) => this.preventSelectDefault(event)}>
                    {
                        otherIleVersionList[otherIleVersionEle].map((data: any, index: number) => {
                            return <Select.Option key={index} value={data.fileVersion} > {data.fileVersion} < /Select.Option>
})
}
                                < /Select>
)}
                            </Form.Item>)