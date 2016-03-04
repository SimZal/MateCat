export default React.createClass({
    getInitialState : function() {
        console.log( 'props ------------', this.props );

        return {
            collapsed : this.props.isCurrent == false
        }; 
    },

    componentWillReceiveProps : function(nextProps) {
        console.log( 'receiving props', nextProps );

        this.setState({ collapsed : !nextProps.isCurrent });
    },

    issueMouseEnter : function( issue, event, reactid ) {
        var node = $('.muted-text-box', ReactDOM.findDOMNode( this ) ) ; 
        ReviewImproved.highlightIssue( issue, node ); 
    }, 

    issueMouseLeave : function() {
        var selection = document.getSelection();
        selection.removeAllRanges();
    },

    translationMarkup : function() {
        return { __html : UI.decodePlaceholdersToText( this.props.translation ) };
    },

    toggleTrackChanges : function(e) {
        e.preventDefault(); 
        e.stopPropagation(); 
        this.setState({trackChanges : !this.state.trackChanges });
    },

    getMarkupForTrackChanges : function() {
        return { __html :  this.props.trackChangesMarkup  };
    },

    render : function() {
        var cs = classnames({
            collapsed : this.state.collapsed,
            'review-translation-version' : true 
        });

        var versionLabel = this.props.isCurrent ? 'Current version' : 'Version' ; 

        var styleForVersionText = { 
            display: this.state.trackChanges ? 'none' : 'block' 
        }; 
        var styleForTrackChanges = {
            display: this.state.trackChanges ? 'block' : 'none' 
        }; 

        var labelForToggle = this.state.trackChanges ? 'Issues' : 'Track changes' ;

        if ( this.props.trackChangesMarkup ) {
            var trackChangesLink = <a href="#" onClick={this.toggleTrackChanges}
                    className="review-track-changes-toggle">{labelForToggle}</a>;
        }

        return <div className="review-version-wrapper">
            <div className={cs} >
            <div className="review-version-header">
                <h3>{versionLabel} {this.props.versionNumber}</h3>
            </div>

            <div className="collapsable">

                <div className="muted-text-box" style={styleForVersionText}
                dangerouslySetInnerHTML={this.translationMarkup()} />

                <div style={styleForTrackChanges}
                className="muted-text-box review-track-changes-box"
                dangerouslySetInnerHTML={this.getMarkupForTrackChanges()} />

                {trackChangesLink}

                <ReviewIssuesContainer 
                    issueMouseEnter={this.issueMouseEnter} 
                    issueMouseLeave={this.issueMouseLeave}
                    sid={this.props.sid} 
                    versionNumber={this.props.versionNumber} />
                </div>
            </div>
        </div>
            ;

    }
}); 