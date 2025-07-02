import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { AntUser } from './config/virtual-list.config';
import { UserEntry } from './config/scroll-list.config';


@Injectable({
  providedIn: 'root'
})


export class UserService {
  private readonly DEFAULT_DELAY_MS = 1000;

  constructor(private http: HttpClient) {}

  /** Fetch users from API and attach avatar */
  fetchUsers(apiUrl: string): Observable<AntUser[]> {
    return this.http.get<AntUser[]>(apiUrl).pipe(
      map(users =>
        users.map(user => ({
          ...user,
          avatar: 'https://i.pravatar.cc/50?u=' + user.id,
        }))
      )
    );
  }

  /** Generate fake users for pagination fallback */
  generateFakeUsers(existingCount: number, count: number): Observable<AntUser[]> {
    const startId = existingCount + 1;
    const fakeUsers = Array.from({ length: count }, (_, i) => {
      const id = (startId + i).toString();
      return {
        id,
        name: `User ${id}`,
        email: `user${id}@example.com`,
        avatar: `https://i.pravatar.cc/50?u=fake${id}`,
        gender: 'unknown',
      };
    });

    return of(fakeUsers).pipe(delay(this.DEFAULT_DELAY_MS));
  }

  /** Load more items for virtual scroll */
  loadMoreVirtualItems(
    data: UserEntry[],
    currentIndex: number,
    batchSize: number,
    delayMs?: number
  ): Promise<UserEntry[]> {
    const delayTime = delayMs ?? this.DEFAULT_DELAY_MS;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const next = data.slice(currentIndex, currentIndex + batchSize);
          resolve(next);
        } catch (error) {
          reject(error);
        }
      }, delayTime);
    });
  }
}