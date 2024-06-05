export enum PostStates
{
    PendingReview = 1, // La publicación está esperando revisión por un editor.
    Draft = 2, // La publicación está en modo borrador y aún no está lista para su revisión.
    Published = 3, // La publicación ha sido revisada y es visible para el público.
    Archived = 4, // La publicación ha sido archivada y ya no es visible para el público.
    Rejected = 5 // La publicación ha sido revisada y rechazada por un editor.
}

export enum ContentsType
{
    Animal = 1,
    Adversiment = 2
}