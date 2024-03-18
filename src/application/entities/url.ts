import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/Replace';

export interface UrlProps {
  originalUrl: string;
  hash: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  visits: number;
  deletedAt?: null | Date;
}

export class Url {
  private _id: string;
  private props: UrlProps;

  constructor(
    props: Replace<
      UrlProps,
      {
        createdAt?: Date;
        updatedAt?: Date;
        visits?: number;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      deletedAt: props.deletedAt ?? null,
      visits: props.visits ?? 0,
    };
  }

  get id(): string {
    return this._id;
  }

  get originalUrl(): string {
    return this.props.originalUrl;
  }

  set originalUrl(originalUrl: string) {
    this.props.originalUrl = originalUrl;
  }

  get hash(): string {
    return this.props.hash;
  }

  set hash(hash: string) {
    this.props.hash = hash;
  }

  get visits(): number {
    return this.props.visits;
  }

  set visits(visits: number) {
    this.props.visits = visits;
  }

  get userId(): string {
    return this.props.userId;
  }

  set userId(userId: string) {
    this.props.userId = userId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  get deletedAt(): Date | null {
    return this.props.deletedAt;
  }

  set deletedAt(deletedAt: Date | null) {
    this.props.deletedAt = deletedAt;
  }
}
