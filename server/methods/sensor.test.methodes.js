Meteor.methods({
    getLastSensorData: function(mode, topic, limit) {
        var pipeline = [];
        if(mode === 'minute') {
            pipeline = [
                {$match: {topic: topic}},
                {
                    $group: {
                        _id: {
                            year: {$year: '$createdAt'},
                            month: {$month: '$createdAt'},
                            day: {$dayOfMonth: '$createdAt'},
                            hour: {$hour: '$createdAt'},
                            minute: {$minute: '$createdAt'}
                        },
                        avgValue: {$avg: '$value'}
                    }
                },
                {$sort: {_id: -1}},
                {$limit: limit}
            ];
        } else if(mode === 'hour') {
            pipeline = [
                {$match: {topic: topic}},
                {
                    $group: {
                        _id: {
                            year: {$year: '$createdAt'},
                            month: {$month: '$createdAt'},
                            day: {$dayOfMonth: '$createdAt'},
                            hour: {$hour: '$createdAt'}
                        },
                        avgValue: {$avg: '$value'}
                    }
                },
                {$sort: {_id: -1}},
                {$limit: limit}
            ];
        } else if(mode === 'day') {
            pipeline = [
                {$match: {topic: topic}},
                {
                    $group: {
                        _id: {
                            year: {$year: '$createdAt'},
                            month: {$month: '$createdAt'},
                            day: {$dayOfMonth: '$createdAt'}
                        },
                        avgValue: {$avg: '$value'}
                    }
                },
                {$sort: {_id: -1}},
                {$limit: limit}
            ];
        } else if(mode === 'month') {
            pipeline = [
                {$match: {topic: topic}},
                {
                    $group: {
                        _id: {
                            year: {$year: '$createdAt'},
                            month: {$month: '$createdAt'}
                        },
                        avgValue: {$avg: '$value'}
                    }
                },
                {$sort: {_id: -1}},
                {$limit: limit}
            ];
        } else if(mode === 'year') {
            pipeline = [
                {$match: {topic: topic}},
                {
                    $group: {
                        _id: {
                            year: {$year: '$createdAt'}
                        },
                        avgValue: {$avg: '$value'}
                    }
                },
                {$sort: {_id: -1}},
                {$limit: limit}
            ];
        }
        //var pipeline = [
        //    {$match : {topic : topic}},
        //    { $group : {
        //        _id: {
        //            modes[mode]
        //        },
        //        avgValue: { $avg : '$value' }
        //    }},
        //    {$sort: {_id: -1}},
        //    { $limit : limit }
        //];
        return SensorTest.aggregate(pipeline);
    }
});