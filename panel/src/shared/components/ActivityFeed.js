"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatRelativeTime } from '@/shared/utils/format';
import { Activity } from 'lucide-react';

/**
 * ActivityFeed - Display recent activity/actions
 * 
 * @param {Object} props
 * @param {Array} props.activities - Array of activity items
 * @param {string} [props.title] - Card title
 */
export function ActivityFeed({ activities = [], title = "Recent Activity" }) {
  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No recent activity
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0"
            >
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.message}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.user || 'System'}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                {activity.type && (
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">
                  {formatRelativeTime(activity.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
